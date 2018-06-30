/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import { client, Faction, hasClientAPI, PlayerState } from '@csegames/camelot-unchained';
import styled from 'react-emotion';
import RespawnLocation from './RespawnLocation';


const Container = styled('div')`
  border-image-slice: 1;
  background: url(images/ui/interactive-alert/alert-bg.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: fixed;
  top: -2px;
  width: 700px;
  height: 140px;
  left: 50%;
  margin-left: -350px;
  -webkit-transition: height 1s;
  transition: height 1s;
  &:before {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    content: '';
    position: absolute;
    left: 50px;
    right: 50px;
    top: 0;
    height: 10px;
    background-image: url(images/ui/interactive-alert/divider-top.png);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
}
  &:after {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    content: '';
    position: absolute;
    left: 50px;
    right: 50px;
    bottom: -2px;
    height: 10px;
    background-image: url(images/ui/interactive-alert/divider-bottom.png);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
}
`;


export interface RespawnProps {
  setVisibility: (vis: boolean) => void;
}
export interface RespawnState {
  nearest: RespawnLocation[];
}

class Respawn extends React.Component<RespawnProps, RespawnState> {
  public name: string = 'Respawn';
  public home: RespawnLocation = new RespawnLocation(-1, 0, 0);
  public faction: string = null;

  constructor(props: RespawnProps) {
    super(props);
    this.state = {
      nearest: null,
    };
  }

  public render() {
    if (!hasClientAPI()) return null;

    const buttons: JSX.Element[] = [];
    if (this.state.nearest) {
      this.state.nearest.forEach((spawn: RespawnLocation): void => {
        buttons.push(this.renderButton(spawn, 'Control Point'));
      });
    }
    return (
      <Container>
        <div className='cu-window-header'><div className='title'>Respawn</div></div>
        <div className='cu-window-content'>
          {this.renderButton(this.home, 'Default')}
          {buttons}
        </div>
      </Container>
    );
  }

  public componentDidMount() {

    if (!hasClientAPI()) return;

    client.OnPlayerStateChanged((playerState: PlayerState) => {
      switch (playerState.faction) {
        case Faction.Arthurian: this.faction = 'A'; break;
        case Faction.TDD: this.faction = 'T'; break;
        case Faction.Viking: this.faction = 'V'; break;
      }
    });
  }

  private renderButton = (location: RespawnLocation, label: string) => {
    let distance: JSX.Element;
    if (location.distance !== undefined) {
      distance =
        <div className='distance'>
          ({Math.round(location.distance)}m)
        </div>;
    }
    return (
      <div className='respawn__button' onClick={() => client.Respawn(location.id + '')}>
        <div className='label'>
          {distance}
          {label}
        </div>
      </div>
    );
  }
}

export default Respawn;
