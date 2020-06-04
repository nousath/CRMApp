export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
		{
			path: 'leads',
			data: {
			  menu: {
				title: 'Leads',
				icon: 'ion-ios-people',
				selected: false,
				expanded: false,
				order: 0,
			  },
			},
		},
		{
			path: 'order',
			data: {
			  menu: {
				title: 'Order',
				icon: 'ion-compose',
				selected: false,
				expanded: false,
				order: 0,
			  },
			},
		}
    ]
  }
];
