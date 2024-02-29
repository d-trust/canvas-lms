# frozen_string_literal: true

#
# Copyright (C) 2018 - present Instructure, Inc.
#
# This file is part of Canvas.
#
# Canvas is free software: you can redistribute it and/or modify it under
# the terms of the GNU Affero General Public License as published by the Free
# Software Foundation, version 3 of the License.
#
# Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
# WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
# A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
# details.
#
# You should have received a copy of the GNU Affero General Public License along
# with this program. If not, see <http://www.gnu.org/licenses/>.
#

class OutcomeProficiencyRating < ApplicationRecord
  include Canvas::SoftDeletable
  extend RootAccountResolver

  belongs_to :outcome_proficiency, inverse_of: :outcome_proficiency_ratings

  validates :description, presence: true
  validates :points, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :color, presence: true, format: /\A([A-Fa-f0-9]{6})\z/i
  resolves_root_account through: :outcome_proficiency

  def destroy
    if marked_for_destruction?
      destroy_permanently!
    else
      super
    end
  end

  def as_json(_options = {})
    {}.tap do |h|
      h["description"] = description
      h["points"] = points
      h["mastery"] = mastery
      h["color"] = color
    end
  end
end
