class Api::CommentsController < ApplicationController
  def create
    @comment = current_user.comments.create(comment_params)
    render :show if @comment.save
  end

  def destroy
  end

  private
  def comment_params
    params.require(:comment).permit(:drawing_id, :body)
  end
end
