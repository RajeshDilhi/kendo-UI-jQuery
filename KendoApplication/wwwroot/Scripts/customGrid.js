
$(document).ready(function () {

    $("#grid").kendoGrid({
        
        dataSource: {
            type: "odata",
            transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
            },
            pageSize: 20
        },
        height: 550,
        groupable: true,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        columns: [{
            template: "<div class='customer-photo'" +
                "style='background-image: url(https://demos.telerik.com/kendo-ui/content/web/Customers/#:data.CustomerID#.jpg);'></div>" +
                "<div class='customer-name'>#: ContactName #</div>",
            field: "ContactName",
            title: "Contact Name",
            width: 240
        }, {
            field: "ContactTitle",
            title: "Contact Title"
        }, {
            field: "CompanyName",
            title: "Company Name"
        }, {
            field: "Country",
            width: 150
            }],
        dataBound: function (e) {
            MergeGridRows(e.sender.element[0].id, 'Contact Title');
        },
    });

    function MergeGridRows(gridId, colTitle) {

        $('#' + gridId + '>.k-grid-content>table').each(function (index, item) {
            var dimension_col = 1;
            // First, scan first row of headers for the "Dimensions" column.
            $('#' + gridId + '>.k-grid-header>.k-grid-header-wrap>table').find('th').each(function () {
                var _this = $(this);
                if (_this.text() == colTitle) {
                    var bgColor = _this.css('background-color');
                    var foreColor = _this.css('color');
                    var rightBorderColor = _this.css('border-right-color');

                    // first_instance holds the first instance of identical td
                    var first_instance = null;
                    var cellText = '';
                    var arrCells = [];
                    $(item).find('tr').each(function () {
                        // find the td of the correct column (determined by the colTitle)
                        var dimension_td = $(this).find('td:nth-child(' + dimension_col + ')');

                        if (first_instance == null) {
                            first_instance = dimension_td;
                            cellText = first_instance.text();
                        } else if (dimension_td.text() == cellText) {
                            // if current td is identical to the previous
                            dimension_td.css('border-top', '0px');
                        } else {
                            // this cell is different from the last
                            arrCells = ChangeMergedCells(arrCells, cellText, true);
                            //first_instance = dimension_td;
                            cellText = dimension_td.text();
                        }
                        arrCells.push(dimension_td);
                        dimension_td.text("");
                        dimension_td.css('background-color', 'white').css('color', 'black').css('border-bottom-color', 'transparent');
                    });
                    arrCells = ChangeMergedCells(arrCells, cellText, true);
                    return;
                }
                dimension_col++;
            });

        });
    }
    function ChangeMergedCells(arrCells, cellText, addBorderToCell) {
        var cellsCount = arrCells.length;
        if (cellsCount > 1) {
            var index = parseInt(cellsCount / 2);
            var cell = null;
            if (cellsCount % 2 == 0) { // even number
                cell = arrCells[index - 1];
                arrCells[index - 1].css('vertical-align', 'bottom');
            }
            else { // odd number
                cell = arrCells[index];
            }
            cell.text(cellText);
            if (addBorderToCell) {
                arrCells[cellsCount - 1].css('border-bottom', 'solid 1px #ddd');

            }

            arrCells = []; // clear array for next item
        }
        if (cellsCount == 1) {
            cell = arrCells[0];
            cell.text(cellText);
            arrCells[0].css('border-bottom', 'solid 1px #ddd');
            arrCells = [];
        }
        return arrCells;
    }
    //function mergeGridRows(gridId, colTitle) {

    //    $('#' + gridId + '>.k-grid-content>table').each(function (index, item) {

    //        var dimension_col = 1;
    //         First, scan first row of headers for the "Dimensions" column.
    //        $('#' + gridId + '>.k-grid-header>.k-grid-header-wrap>table').find('th').each(function () {
    //            if ($(this).text() == colTitle) {

    //                 first_instance holds the first instance of identical td
    //                var first_instance = null;

    //                $(item).find('tr').each(function () {

    //                     find the td of the correct column (determined by the colTitle)
    //                    var dimension_td = $(this).find('td:nth-child(' + dimension_col + ')');

    //                    if (first_instance == null) {
    //                        first_instance = dimension_td;
    //                    } else if (dimension_td.text() == first_instance.text()) {
    //                         if current td is identical to the previous
    //                         then remove the current td
    //                        dimension_td.remove();
    //                         increment the rowspan attribute of the first instance
    //                        first_instance.attr('rowspan', typeof first_instance.attr('rowspan') == "undefined" ? 2 : first_instance.attr('rowspan') + 1);
    //                    } else {
    //                         this cell is different from the last
    //                        first_instance = dimension_td;
    //                    }
    //                });
    //                return;
    //            }
    //            dimension_col++;
    //        });

    //    });
    //}
});

//$(document).ready(function () {
//    var data = [
//        { NavistarPartNumber: '3213213', DealerPartNumber: '231233', DealerActive: 'Y', profits: 36130.0 },
//        { NavistarPartNumber: '3213213', DealerPartNumber: '123213', DealerActive: 'Y', profits: 36130.0 },
//        { NavistarPartNumber: '3213213', DealerPartNumber: '421422', DealerActive: 'N', profits: 11231.0 },
//        { NavistarPartNumber: '3213213', DealerPartNumber: '243233', DealerActive: 'Y', profits: 25311.0 },
//        { NavistarPartNumber: '3213213', DealerPartNumber: '425543', DealerActive: 'Y', profits: 22341.0 },
//        { NavistarPartNumber: '231233', DealerPartNumber: '442344', DealerActive: 'Y', profits: -10567.0 },
//        { NavistarPartNumber: '231233', DealerPartNumber: '254234', DealerActive: 'N', profits: 14099.0 },
//        { NavistarPartNumber: '231233', DealerPartNumber: '534534', DealerActive: 'N', profits: 3536.3 },
//        { NavistarPartNumber: '231233', DealerPartNumber: '235521', DealerActive: 'N', profits: 12119.6 },
//        { NavistarPartNumber: '231233', DealerPartNumber: '654565', DealerActive: 'N', profits: 2024.0 }
//    ];

//    function autoMerge(grid, refresh) {
//        var mc = [],
//            CM = grid.option("colModel"),
//            i = CM.length,
//            data = grid.option("dataModel.data");

//        while (i--) {
//            var dataIndx = CM[i].dataIndx,
//                rc = 1,
//                j = data.length;

//            while (j--) {
//                var cd = data[j][dataIndx],
//                    cd_prev = data[j - 1] ? data[j - 1][dataIndx] : undefined;
//                if (cd_prev !== undefined && cd == cd_prev) {
//                    rc++;
//                }
//                else if (rc > 1) {
//                    mc.push({ r1: j, c1: i, rc: rc, cc: 1 });
//                    rc = 1;
//                }
//            }
//        }
//        grid.option("mergeCells", mc);
//        if (refresh) {
//            grid.refreshView();
//        }
//    };

//    var obj = {
//        width: 'flex',
//        height: 400,
//        numberCell: { show: false },
//        flex: { one: true },
//        sort: function () {
//            autoMerge(this);
//        },
//        title: "Cell merge (rowspan)",
//        sortModel: { sorter: [{ dataIndx: 'NavistarPartNumber', dir: 'up' }], space: true },

//    };
//    obj.colModel = [
//        { title: "NavistarPartNumber", width: 100, dataType: "string", dataIndx: "NavistarPartNumber" },
//        { title: "DealerPartNumber", width: 200, dataType: "string", dataIndx: "DealerPartNumber" },
//        { title: "DealerActive", width: 150, dataType: "string", dataIndx: "DealerActive" },
//        { title: "Profits ($ millions)", width: 150, dataType: "float", dataIndx: "profits", format: '$#,###.00' }
//    ];
//    obj.dataModel = {
//        data: data
//    };
//    $("#grid_json").kendoGrid(obj);
//}); 