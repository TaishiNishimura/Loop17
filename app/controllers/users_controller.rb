class UsersController < ApplicationController
  before_action :authenticate_user!
  def index
    @users = User.all
    @audio = Audio.where(user_id: current_user.id).first
  end

  def edit
    @user = User.find(params[:id])
    @audio = Audio.where(user_id: @user.id).first
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    redirect_to request.referer
  end

  private

  def user_params
    params.require(:user).permit(:name, :profile_image)
  end
end
