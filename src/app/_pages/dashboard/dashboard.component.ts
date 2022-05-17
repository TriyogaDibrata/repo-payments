import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/productservice';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { AuthService } from 'src/app/_requests/auth.service';
import { DashboardService } from 'src/app/_requests/dashboard.service';
import * as moment from 'moment';
 
@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    items: MenuItem[];

    products: Product[];

    chartData: any;

    chartOptions: any;

    subscription: Subscription;

    config: AppConfig;

    currentUser = this.auth.currentUserValue;
    
    curentRevenue;
    currentCustomer;
    payments;
    bulans = [1,2,3,4,5,6,7,8,9,10,11,12];
    bulanStr = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustust', 'September', 'Oktober', 'November', 'Desember'];
    pieData;
    pieOptions;
    pieLabel = [];
    pieValue = [];
    barData;
    barLabel = [];
    barValue = [];
    baroptions;
    tahun = moment().year();

    constructor(
        private productService: ProductService, 
        public configService: ConfigService,
        private auth : AuthService,
        private dashboardService : DashboardService
        ) {}

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
            this.updateChartOptions();
        });

        this.getData();
    }
    
    getData() {
        this.dashboardService.getData().subscribe((res) => {
            console.log(res);
            if(res && res['success']) {
                this.curentRevenue = res['data']['current_revenue'];
                this.currentCustomer = res['data']['customer'];
                this.payments = res['data']['current_payment'];
                let custPackage = res['data']['cust_package'];
                let revByMonth = res['data']['revenue_by_month'];
                
                custPackage.forEach((value) => {
                    this.pieLabel.push(value.name);
                    this.pieValue.push(value.total);
                });
                
                revByMonth.forEach((value) => {
                    this.barLabel.push(this.bulanStr[value.month -1]);
                    this.barValue.push(value.total);
                })
                
                this.pieData = {
                    labels: this.pieLabel,
                    datasets: [
                        {
                            data: this.pieValue,
                            backgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56"
                            ],
                            hoverBackgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56"
                            ]
                        }
                    ]
                };
                
                this.barData = {
                    labels: this.barLabel,
                    datasets: [
                        {
                            label: 'Total Penadapatan',
                            backgroundColor: '#2f4860',
                            data: this.barValue
                        }
                    ]
                }
            }
        })
    }

    updateChartOptions() {
        if (this.config.dark)
            this.applyDarkTheme();
        else
            this.applyLightTheme();
    }

    applyDarkTheme() {
        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            }
        };
        
        this.baroptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color:  '#ebedef',
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color:  '#ebedef',
                    }
                },
            }
        };
    }

    applyLightTheme() {
            this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color:  '#ebedef',
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color:  '#ebedef',
                    }
                },
            }
        };
    }
}
