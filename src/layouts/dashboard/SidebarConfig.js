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
        title: 'Step One',
        href: PATH_DASHBOARD.general.pageOne,
        icon: ICONS.page
      },
      {
        title: 'Step Two',
        href: PATH_DASHBOARD.general.pageTwo,
        icon: ICONS.page
      },
      {
        title: 'Step Three',
        href: PATH_DASHBOARD.general.pageThree,
        icon: ICONS.page
      },
      {
        title: 'Step Four',
        href: PATH_DASHBOARD.general.pageFour,
        icon: ICONS.page
      },
      {
        title: 'Step Five',
        href: PATH_DASHBOARD.general.pageFive,
        icon: ICONS.page
      },
      {
        title: 'Step Six',
        href: PATH_DASHBOARD.general.pageSix,
        icon: ICONS.page
      }
    ]
  }
];

export default sidebarConfig;
