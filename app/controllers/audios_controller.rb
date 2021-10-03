class AudiosController < ApplicationController
  def new
    @audio = Audio.new
  end

  def create
    @audio = Audio.new(audio_params)
    @audio.user_id = current_user.id
    @audio.score = Language.get_data(audio_params[:title])

    message = nil
    if audio_params[:audio] == nil
      message = '音声データが空のまま投稿されました'
    elsif !(under_17_seconds?(audio_params[:audio].tempfile))
      message = '17秒以内のファイルにしてください😓'
    end

    if message == nil
      @audio.save
    end

    redirect_to request.referer, notice: message
  end

  def update
    @audio = Audio.where(user_id: current_user.id).first

    message = nil
    if audio_params[:audio] == nil
      message = '音声データが空のまま更新されました'
    elsif !(under_17_seconds?(audio_params[:audio].tempfile))
      message = '17秒以内のファイルにしてください😓'
    end

    if message == nil
      @audio.update(audio_params)
    end
    redirect_to request.referer, notice: message
  end

  def destroy
    audio = Audio.where(user_id: current_user.id).first
    if audio.present?
      audio.destroy
      redirect_to request.referer
    end
  end

  def search
    @audios = Audio.where(genre_id: params[:genre_id])
    @users = User.where(id: @audios.pluck('user_id')).includes([:audio])
    @audio = Audio.where(user_id: current_user.id).first
    render "users/index"
  end

  private

  def audio_params
    params.require(:audio).permit(:audio, :title, :genre_id)
  end

  def under_17_seconds?(file_path)
    if Mp3Info.open(file_path).length.floor < 18
      true
    else
      false
    end
  end
end
