(function () {
    "use strict";

    angular.module('QR.Web.Author')
    .controller('DashboardController', ['$timeout', 'SharedService', function ($timeout, SharedService) {
        var self = this;
        self.timeout = $timeout;
        self.shared = SharedService;
        self.shared.currentContext = 'Dashboard';

        self.smapledt = new Date('01-02-2016');
        self.vxSampleData = [];
        self.showGrid = false;
        self.categories = [
            { 'id': '1', 'name': 'previsit' },
            { 'id': '2', 'name': 'onsite' },
            { 'id': '3', 'name': 'general' },
            { 'id': '4', 'name': 'business' }
        ];
        var original = [
            {
                readOnly: "Y",
                transferFromCustomer: "Alpine Ski House A Alpine Ski House AAlpine Ski House A",
                transferFromAssignment: "NB-FY15-XYZ-Coho-1745 NB-FY15-XYZ-Coho-174 NB-FY15-XYZ-Coho-174 NB-FY15-XYZ-Coho-174 NB-FY15-XYZ-Coho-174 NB-FY15-XYZ-Coho-174",
                status: "Pending",
                dt: "SEP 21, 2014",
                labor: "01:45",
                date: "APR 21st,2014",
                category: "Previsit",
                timezone: "(UTC - 5:00)Pacific Time(US&Canada)",
                notes: "Lorem ipsum dolor sit amet",
                laborId: "xxx-xxx-xxxx-1",
                errors: {}, link: 'http://bing.com',
                errorsShow: false,
                disabled: false,
                transferStatus: 0,
                locked: true
            }
        ];

        function SamplePost() {
            this.id = _.uniqueId('_ORIG_POST');
            this.name = 'Lorem ipsum dolor sit amet';
            this.category = _.sample(['html', 'css', 'js', 'scss', 'others']);
            this.author = _.sample(['Rupesh Rawat', 'Asit Parida', 'Dhairya Vora']);
            this.contentType = _.sample(['tl-dr', 'article']);
            this.createdDate = new Date();
            this.published = _.sample([true, false]);
            this.suspended = _.sample([true, false]);
        }

        self._origCopy = [];

        self.sampling = function (iter) {
            var _samples = [];
            self.sampleRowClasses = {};
            for (var i = 0; i < iter; i++) {
                var _post = new SamplePost();
                _samples.push(_post);
            }
            return _samples;
        }

        self.vxSampleConfig = {
            enableDropdownsInHeader: true,
            ddSort: true,
            columnFilteringEnabled: true,
            groupedColumnHidingEnabled: false,
            selectionEnabled: true,
            selectionAtMyRisk: true,
            preserveSelectionOnFilters: true,
            allRowsSelectionEnabled: true,
            multiSelectionEnabled: true,
            multiSelectionDependentCol: null,
            onSelectionReturnCol: 'id',
            showGridStats: false,
            showGridOptions: false,
            latchExcess: 20,
            data: self.sampling(100),
            jsonEditorEnabled: false,
            vxFilteredData: [],
            hybrid: true,
            rowClassFn: randomRowFunction,
            hybridCellDefn: hybridCellDefn,
            rowSelectionCallback: function (data) {
                console.log('rowSelectionCallback', data);
            },
            virtualization: false,
            pagination: false,
            pageLength: 100000,
            sortPredicate: 'name',
            reverseSortDirection: false,
            emptyFill: 'No records in the grid',
            loaderGifSrc: '/dist/images/loaderBlue30.gif',
            columnDefConfigs: [
                { id: 'id', columnName: 'ID', hidden: true, ddSort: true, width: '160' },
                { id: 'name', columnName: 'Name', ddSort: true, ddGroup: false, ddFilters: true, dropDownEnabled: true, },
                { id: 'category', columnName: 'Category', ddSort: true, ddGroup: false, ddFilters: true, ddFiltersWithSearch: true, dropDownEnabled: true },
                { id: 'author', columnName: 'Author', ddSort: true, ddGroup: false, ddFilters: true, dropDownEnabled: true, hidden: false },
                { id: 'contentType', columnName: 'Type', ddSort: true, ddGroup: false, ddFilters: true, ddFiltersWithSearch: true, dropDownEnabled: true, renderHybridCellDefn: false },
                { id: 'createdDate', columnName: 'Created On', columnIsDate: true, columnDatePipe: 'dd-MM-yyyy', ddSort: true, ddGroup: false, ddFilters: true, dropDownEnabled: true, ddFiltersWithSearch: true },
                { id: 'published', columnName: 'Is Published', ddSort: true, ddGroup: false, ddFilters: false, hidden: false, headTabIndex: -1, renderHybridCellDefn: true },
                { id: 'suspended', columnName: 'Is Suspended', ddSort: true, ddGroup: false, ddFilters: false, hidden: false, renderHybridCellDefn: true }
            ]
        };

        function hybridCellDefn(row, col) {
            var tmpl = '<span>VX_DATA_POINT</span>';
            if (col.id == 'category')
                tmpl = tmpl.replace('VX_DATA_POINT', row[col.id].name || '');
            if (col.id == 'published') {
                tmpl = row[col.id] == true ? '<p class="vx-grid-p"><i class="ms-Icon ms-Icon--SkypeCircleCheck green"></i></p>' : '<p class="vx-grid-p"><span>-</span></p>'
            }
            if (col.id == 'suspended') {
                tmpl = row[col.id] == true ? '<p class="vx-grid-p"><i class="ms-Icon ms-Icon--SkypeCircleCheck red"></i></p>' : '<p class="vx-grid-p"><span>-</span></p>'
            }
            return tmpl;
        }

        function randomRowFunction(row) {            
        }

        self.openManageColumns = function () {
            self.vxSampleConfig.openManageColumns();
        }

    }]);
})();