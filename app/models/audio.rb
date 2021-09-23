class Audio < ApplicationRecord
  belongs_to :user
  #belongs_to :genre_id
  mount_uploader :audio, AudiofileUploader

end
