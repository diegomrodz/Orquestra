<div ng-controller="PinDetailCtrl">
    <p class="caption">{{ pin.desc }}</p>
    <div class="divider"></div>
    
    <br>
    
    <div class="flotchart-placeholder" >
        <flot dataset="chartDataset" options="chartOptions" ></flot>
    </div>
    
    <div>
        <div id="chart-legends" style="width: 150px; float: right;"></div>
    </div>
    
</div>