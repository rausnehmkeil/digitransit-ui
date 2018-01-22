import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import { Link } from 'react-router';

import DisruptionInfoButtonContainer from './DisruptionInfoButtonContainer';
import Icon from './Icon';
import LangSelect from './LangSelect';
import MainMenuLinks from './MainMenuLinks';

function MainMenu(props, { config, intl }) {
  /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
  return (
    <div aria-hidden={!props.visible} className="main-menu no-select">
      <button
        onClick={props.toggleVisibility}
        className="close-button cursor-pointer"
        aria-label={intl.formatMessage({
          id: 'main-menu-label-close',
          defaultMessage: 'Close the main menu',
        })}
      >
        <Icon img="icon-icon_close" className="medium" />
      </button>
      <header className="offcanvas-section">
        <LangSelect />
      </header>
      <div className="offcanvas-section">
        <Link id="frontpage" to={props.homeUrl}>
          <FormattedMessage id="frontpage" defaultMessage="Frontpage" />
        </Link>
      </div>
      <div className="offcanvas-section">
        {config.mainMenu.showDisruptions &&
          props.showDisruptionInfo && <DisruptionInfoButtonContainer />}
      </div>
      <MainMenuLinks
        content={(
          [config.appBarLink].concat(config.footer && config.footer.content) ||
          []
        ).filter(item => item.href || item.route)}
      />
    </div>
  );
}

MainMenu.propTypes = {
  showDisruptionInfo: PropTypes.bool,
  toggleVisibility: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  homeUrl: PropTypes.string.isRequired,
};

MainMenu.defaultProps = {
  visible: true,
};

MainMenu.contextTypes = {
  getStore: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  // due to a bug within react/no-typos it gives a false positive
  // on intlShape.isRequired, need to do this until it's fixed
  // eslint-disable-next-line react/no-typos
  intl: intlShape.isRequired,
};

export default MainMenu;
