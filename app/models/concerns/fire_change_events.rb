module FiresChangeEvents
  extend ActiveSupport::Concern

  included do
    after_commit :fire_change_event
  end

  def fire_change_event
    ChangedModelList.changed(self)
  end
end
