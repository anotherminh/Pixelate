class Api::KudosController < ApplicationController
  def create
    if current_user
      @kudo = current_user.kudos_given.create(kudos_params)
      if @kudo.save
        render :show
      end
    end
  end

  def destroy
    if current_user
      @kudo = Kudo.where('user_id = ? AND drawing_id = ?', current_user.id, params[:id])[0]
      if @kudo.delete
        render json: { user_id: current_user.id, drawing_id: params[:id][0] } 
      end
    end
  end

  private
  def kudos_params
    params.require(:kudo).permit(:drawing_id)
  end
end
