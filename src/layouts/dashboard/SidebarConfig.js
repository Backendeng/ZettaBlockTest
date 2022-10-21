// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: 22, height: 22 }}
  />
);

const ICONS = {
  page: getIcon('ic_page'),
  dashboard: getIcon('ic_dashboard')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'Tap One',
        href: PATH_DASHBOARD.general.pageOne,
        icon: ICONS.page
      },
      {
        title: 'Tap Two',
        href: PATH_DASHBOARD.general.pageTwo,
        icon: ICONS.page
      }
    ]
  }
];

export default sidebarConfig;
