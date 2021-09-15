class AudiosController < ApplicationController
  def new
    @audio = Audio.new
  end

  def create
    @audio = Audio.new(audio_params)
    @audio.user_id = @user.id
    @audio.genre_id = genre.id
    @audio.save
    redirect_to request.referer
  end

  def update
    @audio = Audio.where(user_id: current_user.id).first
    @audio.update(audio_params)
    redirect_to request.referer
  end

  def destroy
  end

  private

  def audio_params
    params.require(:audio).permit(:audio, :title)
  end
end
