class Api::KudosController < ApplicationController
  def create
    if current_user && current_user.kudos_given.create(kudos_params)
      render :show
    end
  end

  def destroy
    if current_user
      @kudos = Kudo.where('user_id = ? AND drawing_id = ?', current_user.id, kudos_params)[0]
      if @kudos.delete
        render :show
      end
    end
  end

  private
  def kudos_params
    params.require(:kudo).permit(:drawing_id)
  end
end
