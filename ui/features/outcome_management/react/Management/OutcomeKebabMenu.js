/*
 * Copyright (C) 2020 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {View} from '@instructure/ui-view'
import {Menu} from '@instructure/ui-menu'
import {Button} from '@instructure/ui-buttons'
import {
  IconMoreLine,
  IconEditLine,
  IconTrashLine,
  IconMoveEndLine,
  IconInfoLine,
  IconSearchLine,
  IconImportLine
} from '@instructure/ui-icons'
import {ScreenReaderContent} from '@instructure/ui-a11y-content'
import I18n from 'i18n!OutcomeManagement'
import {stripHtmlTags} from '@canvas/outcomes/stripHtmlTags'

const OutcomeKebabMenu = ({
  menuTitle,
  onMenuHandler,
  canEdit,
  canDestroy,
  isGroup,
  groupDescription
}) => {
  const hasDescription =
    typeof groupDescription === 'string' &&
    stripHtmlTags(groupDescription).replace(/[\n\r\t\s(&nbsp;)]+/g, '')
  return (
    <Menu
      trigger={
        <Button variant="icon" icon={IconMoreLine}>
          <ScreenReaderContent>{menuTitle || I18n.t('Menu')}</ScreenReaderContent>
        </Button>
      }
      onSelect={onMenuHandler}
    >
      <Menu.Item disabled={!canEdit} value="edit">
        <IconEditLine size="x-small" />
        <View padding="0 x-large 0 small" data-testid="outcome-kebab-menu-edit">
          {I18n.t('Edit')}
        </View>
      </Menu.Item>
      <Menu.Item disabled={!canDestroy} value="remove">
        <IconTrashLine size="x-small" />
        <View padding="0 small" data-testid="outcome-kebab-menu-remove">
          {I18n.t('Remove')}
        </View>
      </Menu.Item>
      <Menu.Item value="move">
        <IconMoveEndLine size="x-small" />
        <View padding="0 x-large 0 small" data-testid="outcome-kebab-menu-move">
          {I18n.t('Move')}
        </View>
      </Menu.Item>
      {isGroup && (
        <Menu.Item value="add_outcomes">
          <IconSearchLine size="x-small" />
          <View padding="0 small">{I18n.t('Add Outcomes')}</View>
        </Menu.Item>
      )}
      {isGroup && (
        <Menu.Item value="import_outcomes">
          <IconImportLine size="x-small" />
          <View padding="0 small">{I18n.t('Import Outcomes')}</View>
        </Menu.Item>
      )}
      {isGroup && <Menu.Separator />}
      {isGroup && (
        <Menu.Item value="description" disabled={!hasDescription}>
          <IconInfoLine size="x-small" />
          <View padding="0 small">{I18n.t('View Description')}</View>
        </Menu.Item>
      )}
    </Menu>
  )
}

OutcomeKebabMenu.propTypes = {
  onMenuHandler: PropTypes.func.isRequired,
  menuTitle: PropTypes.string,
  canDestroy: PropTypes.bool.isRequired,
  groupDescription: PropTypes.string,
  isGroup: PropTypes.bool,
  canEdit: PropTypes.bool
}

OutcomeKebabMenu.defaultProps = {
  menuTitle: '',
  canEdit: true,
  isGroup: false
}

export default OutcomeKebabMenu
