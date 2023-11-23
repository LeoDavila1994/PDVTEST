import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useMenu } from '../hooks/useMenu';

const Menubar = () => {
  const { isMenuBarOpened, selectedMenuBarOption } = useMenu();

  const [menuSelected, setMenuSelected] = useState(0);

  const [menu] = useState([
    {
      name: 'Givvy Command',
      page: '/',
      icon: 'shopping-basket',
    },
    {
      name: 'Givvy Management',
      page: '/givvy-management',
      icon: 'building',
    },
    {
      name: 'Givvy Guest',
      page: '/givvy-guest',
      icon: 'mobile-alt',
    },
  ]);

  const menuBarClasses = {
    'menu-hidden': !isMenuBarOpened,
  };

  useEffect(() => {
    const index = menu.findIndex((item) => item.name === selectedMenuBarOption);
    setMenuSelected(index);
  }, [selectedMenuBarOption, menu]);

  return (
    <>
      <aside className={classNames('menu-bar menu-sticky menu_branded', menuBarClasses)}>
        <div className="menu-items">
          {menu.map((menuItem, index) => (
            <Link
              key={index}
              to={menuItem.page}
              className={classNames('link', {
                active: index === menuSelected,
              })}
            >
              <span className={classNames('icon la', `la-${menuItem.icon}`)}></span>
              <span className="title">{menuItem.name}</span>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Menubar;
