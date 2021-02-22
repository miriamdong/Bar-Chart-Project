$( function () {

  // draw the chart from the data table and specify a container to put the graph in
  drawBarChart( '#data-table', '.chart' );

  function drawBarChart( data, container ) {
    // Declare some common variables and container elements
    data = $( data );
    container = $( container );

    let bars = [];
    let figureContainer = $( '<div id="figure"></div>' );
    let graphContainer = $( '<div class="graph"></div>' );
    let barContainer = $( '<div class="bars"></div>' );
    let chartData;
    let chartYMax;
    let columnGroups;



    // Create the table data object
    let tableData = {

      // Get numerical data from table cells
      chartData: function () {

        let chartData = [];
        data.find( 'tbody td' ).each( function () {
          chartData.push( $( this ).text() );
        } );
        return chartData;


      },

      // Get heading data from table caption
      chartHeading: function () {
        let chartHeading = data.find( 'caption' ).text();
        return chartHeading;

      },
      // Get legend data from table body
      chartLegend: function () {
        data.find( 'tbody th' ).each( function () {
          chartLegend.push( $( this ).text() );
        } );
        return chartLegend;
      },
      // Get highest value for y-axis scale
      chartYMax: function () {
        let chartData = this.chartData();
        // Round off the value
        let chartYMax = Math.ceil( Math.max.apply( Math, chartData ) / 1000 ) * 3000;
        console.log( chartYMax );

      },
      // Get y-axis data from table cells
      yLegend: function () {

        let chartYMax = this.chartYMax();
        console.log( this.chartYMax );
        let yLegend = [];
        // Number of divisions on the y-axis
        let yAM = 6;
        // Add required number of y-axis markings in order from 0 - max
        for ( let i = 0; i < yAM; i++ ) {
          yLegend.unshift( ( ( chartYMax * i ) / ( yAM - 1 ) ) / 1000 );
        }
        return yLegend;
      },
      // Get x-axis data from table header
      xLegend: function () {

        let xLegend = [];
        // Find th elements in table header - that will tell us what items go in the x-axis legend
        data.find( 'thead th' ).each( function () {
          xLegend.push( $( this ).text() );
        } );
        return xLegend;

      },
      // Sort data into groups based on number of columns
      columnGroups: function () {
        let columnGroups = [];
        // Get number of columns from first row of table body
        let columns = data.find( 'tbody tr:eq(0) td' ).length;
        for ( let i = 0; i < columns; i++ ) {
          columnGroups[ i ] = [];
          data.find( 'tbody tr' ).each( function () {
            columnGroups[ i ].push( $( this ).find( 'td' ).eq( i ).text() );
          } );
        }

        console.log( columnGroups );
      }
    }



    // Useful variables for accessing table data
    chartData = tableData.chartData();
    chartYMax = tableData.chartYMax();
    columnGroups = tableData.columnGroups();

    // Construct the graph

    // Loop through column groups, adding bars as we go
    $.each( columnGroups, function ( i ) {
      // Create bar group container
      let barGroup = $( '<div class="bar-group"></div>' );
      // Add bars inside each column
      for ( let j = 0, k = columnGroups[ i ].length; j < k; j++ ) {
        // Create bar object to store properties (label, height, code etc.) and add it to array
        // Set the height later in displayGraph() to allow for left-to-right sequential display
        let barObj = {};
        barObj.label = this[ j ];
        barObj.height = Math.floor( barObj.label / chartYMax * 100 ) + '%';
        barObj.bar = $( '<div class="bar fig' + j + '"><span>' + barObj.label + '</span></div>' )
          .appendTo( barGroup );
        bars.push( barObj );

      }

      // Add bar groups to graph
      barGroup.appendTo( barContainer );
      console.log( barGroup );
    } );

    // Add heading to graph
    let chartHeading = tableData.chartHeading();
    let heading = $( '<h4>' + chartHeading + '</h4>' );
    heading.appendTo( figureContainer );

    // Add legend to graph
    let chartLegend = tableData.chartLegend();
    let legendList = $( '<ul class="legend"></ul>' );
    $.each( chartLegend, function ( i ) {
      let listItem = $( '<li><span class="icon fig' + i + '"></span>' + this + '</li>' )
        .appendTo( legendList );
    } );
    legendList.appendTo( figureContainer );

    // Add x-axis to graph
    let xLegend = tableData.xLegend();
    let xAxisList = $( '<ul class="x-axis"></ul>' );
    $.each( xLegend, function ( i ) {
      let listItem = $( '<li><span>' + this + '</span></li>' )
        .appendTo( xAxisList );
    } );
    xAxisList.appendTo( graphContainer );
    console.log( graphContainer );
    // Add y-axis to graph
    let yLegend = tableData.yLegend();
    let yAxisList = $( '<ul class="y-axis"></ul>' );
    $.each( yLegend, function ( i ) {
      let listItem = $( '<li><span>' + this + '</span></li>' )
        .appendTo( yAxisList );
    } );

    yAxisList.appendTo( graphContainer );

    // Add bars to graph
    barContainer.appendTo( graphContainer );

    // Add graph to graph container
    graphContainer.appendTo( figureContainer );

    // Add graph container to main container
    figureContainer.appendTo( container );

  }








  console.log( container );
  console.log( figureContainer );
  console.log( graphContainer );
} );
