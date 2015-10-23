class ChangedModelList
  # include HasCurrentInstance # provides Thread-safe `.current=`/`.current`

  attr_accessor :records

  def self.restart!
    self.current = self.new
  end

  def self.changed(some_record)
    if current.present?
      current.records[some_record.class.name][some_record.id] = some_record.as_json
    else
      Rails.logger.debug "Didn't register change for #{some_record.class.name} because it was outside the request cycle"
    end
  end

  def self.fire!
    self.current.fire!
  end

  def initialize
    self.records = Hash.new { |hash, key| hash[key] = {} }
  end

  def fire!
    if self.records.keys.any?
      Pusher.trigger(channel, "records_changed", {records: self.records})
    end
    self.records = nil
    self.class.current = nil
  end

  private

  def channel
    Organization.current.pusher_channel
  end
end
