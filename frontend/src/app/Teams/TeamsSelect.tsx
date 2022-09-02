import React, { useState, useContext, useEffect } from 'react';
import {
  Masthead,
  MastheadContent,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  Button
} from '@patternfly/react-core';
import CaretDownIcon from '@patternfly/react-icons/dist/js/icons/caret-down-icon';
import { Context } from '@app/store/store';
import { useHistory } from 'react-router-dom';
import { teamIsNotEmpty } from '@app/utils/utils';
import ArrowRightIcon from '@patternfly/react-icons/dist/esm/icons/arrow-right-icon';
import { SignOutAltIcon } from '@patternfly/react-icons';

export interface ITeam {
  id: string
  team_name: string
  description: string
}

export const BasicMasthead = () => {
  const history = useHistory()  
  const { state, dispatch } = useContext(Context)
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const onDropdownToggle = (isDropdownOpen: boolean) => {
    setDropdownOpen(isDropdownOpen)
  };

  const onDropdownSelect = (event: any) => {
    setDropdownOpen(!isDropdownOpen)
    dispatch({ type: "SET_TEAM", data:  event.target.dataset.value });
  };
  function Log_out(){
      history.push('/oauth/sign_out');
      window.location.reload();
  }

  const dropdownItems = state.TeamsAvailable.map((team) => <DropdownItem key={team.id} data-value={team.team_name}>{team.team_name}</DropdownItem> )

    return (
      <Masthead id="basic-demo">
        <MastheadContent>
          <Toolbar id="toolbar" isFullHeight isStatic>
            <ToolbarContent>
              <ToolbarGroup alignment={{ default: 'alignLeft' }}>
                <ToolbarItem visibility={{ default: 'hidden', lg: 'visible' }}>
                  <Dropdown
                    onSelect={onDropdownSelect}
                    toggle={
                      <DropdownToggle id="toggle-id" onToggle={onDropdownToggle} toggleIndicator={CaretDownIcon}>
                        {state.Team}
                      </DropdownToggle>
                    }
                    isOpen={isDropdownOpen}
                    dropdownItems={dropdownItems}
                    isFullHeight
                  />
                </ToolbarItem>
                <ToolbarItem visibility={{ default: 'hidden', lg: 'visible' }}>
                  { !teamIsNotEmpty(state.Team) && <Button style={{verticalAlign: "middle", backgroundColor: "var(--pf-c-button--m-primary--Color)", color: "var(--pf-c-button--m-primary--BackgroundColor)"}} onClick={()=>{ history.push("/home/teams") }} type="button" width={300} variant="primary">Create your first Team <ArrowRightIcon /></Button>}
                </ToolbarItem>
              </ToolbarGroup>
            </ToolbarContent>
          </Toolbar>
          <Button onClick={Log_out} variant="link" icon={<SignOutAltIcon />} iconPosition="right">
            Log out
          </Button>
        </MastheadContent>
      </Masthead>
    );
  }