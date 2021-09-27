# frozen_string_literal: true

require 'rails_helper'

describe 'アソシエーションのテスト' do
  context 'Bookモデルとの関係' do
    it '1:1となっている' do
      expect(User.reflect_on_association(:audio).macro).to eq :has_one
    end
  end
end
