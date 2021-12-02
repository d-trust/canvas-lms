# frozen_string_literal: true

#
# Copyright (C) 2011 - present Instructure, Inc.
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

require_relative "../views_helper"

describe "/assignments/redirect_page" do
  it "renders" do
    course_with_student
    view_context(@course, @user)
    a = @course.assignments.create(title: "some assignment")
    s = a.submit_homework(@user)
    assign(:assignment, a)
    assign(:submission, s)
    render "assignments/redirect_page"
    expect(response).not_to be_nil
  end
end
