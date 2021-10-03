class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    @users = User.all.includes([:audio])
    @audio = Audio.where(user_id: current_user.id).first
  end

  def edit
    @user = User.find(params[:id])
    audio = @user.audio
    if audio.present?
      @audio = Audio.where(user_id: @user.id).first
    else
      @audio = Audio.new
    end
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)

    tags = Vision.get_image_data(@user.profile_image)
    tags.each do |tag|
      @user.tags.create(name: tag)
    end

    redirect_to request.referer
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to root_path
  end

  #def show
    #@user = User.find(params)
  #end

  private

  def user_params
    params.require(:user).permit(:name, :profile_image, :twitter, :facebook, :instagram, :youtube)
  end
end
