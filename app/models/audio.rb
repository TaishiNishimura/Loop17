class Audio < ApplicationRecord

  belongs_to :user

  mount_uploader :audio, AudiofileUploader

end
