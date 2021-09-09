class UsersController < ApplicationController
  def index
  end

  def edit
  end
  
  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    redirect_to users_path(@user.id)
  end
  
  private

  def user_params
    params.require(:user).permit(:name, :profile_image)
  end
end
