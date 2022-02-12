import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { RealEstate } from 'src/app/models/realEstate';
import { User } from 'src/app/models/user';
import { RealEstatesService } from 'src/app/services/real-estates.service';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  allRealEstates: RealEstate[];
  user: User;
  constructor(private realEstateService: RealEstatesService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))[0]
    this.realEstateService.getAllRealEstates().subscribe(
      (result: RealEstate[]) => {
        this.allRealEstates = result;
        this.createChartPrice();
        this.createChartTypeHouse();
        this.createChartTypeApartment();
        this.citiesChart();
      }
    )


  }
  createChartPrice() {
    var ctx = 'priceChart';
    var priceChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['0 $ - 50 000 $', '50 000 $ - 100 000 $', '100 000 $ - 150 000 $', '150 000 $ +'],
        datasets: [{
          label: '# of real estates',
          data: [0, 0, 0, 0],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Real estates price distribution'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {

              stepSize: 1
            }
          }
        }
      }
    });
    for (let i = 0; i < this.allRealEstates.length; i++) {
      if (this.allRealEstates[i].typeSale == "sale") {
        let price = this.allRealEstates[i].price;
        if (price < 50000)
          priceChart.data.datasets[0].data[0]++;
        else if (price < 100000)
          priceChart.data.datasets[0].data[1]++;
        else if (price < 150000)
          priceChart.data.datasets[0].data[2]++;
        else
          priceChart.data.datasets[0].data[3]++;

      }
    }
    priceChart.update();
  }
  createChartTypeHouse() {
    var ctx = 'typeHouseChart';
    var typeHouseChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Sale', 'Rent'],
        datasets: [{
          label: '# of real estates',
          data: [0, 0],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'House rent/sale'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
    for (let i = 0; i < this.allRealEstates.length; i++) {
      if (this.allRealEstates[i].type == "house") {
        if (this.allRealEstates[i].typeSale == "sale") {
          typeHouseChart.data.datasets[0].data[0]++;
        }
        if (this.allRealEstates[i].typeSale == "rent") {
          typeHouseChart.data.datasets[0].data[1]++;
        }
      }
    }
    typeHouseChart.update();
  }
  createChartTypeApartment() {
    var ctx = 'typeApartmentChart';
    var typeApartmentChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Sale', 'Rent'],
        datasets: [{
          label: '# of real estates',
          data: [0, 0],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Apartment rent/sale'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
    for (let i = 0; i < this.allRealEstates.length; i++) {
      if (this.allRealEstates[i].type == "apartment") {
        if (this.allRealEstates[i].typeSale == "sale") {
          typeApartmentChart.data.datasets[0].data[0]++;
        }
        if (this.allRealEstates[i].typeSale == "rent") {
          typeApartmentChart.data.datasets[0].data[1]++;
        }
      }
    }
    typeApartmentChart.update();
  }
  citiesChart() {
    class CityStats {
      city: String;
      cnt: number = 0
    }
    let cities: CityStats[] = [];
    for (let i = 0; i < this.allRealEstates.length; i++) {
      if (!cities.some(e => e.city === this.allRealEstates[i].city)) {
        cities.push({ city: this.allRealEstates[i].city, cnt: 0 });
      }
    }
    for (let i = 0; i < this.allRealEstates.length; i++) {
      let cityName = this.allRealEstates[i].city;
      for (let j = 0; j < cities.length; j++) {
        if (cities[j].city == cityName) {
          cities[j].cnt++;
        }
      }
    }
    console.log(cities)

    
    var ctx = 'citiesChart';
    var citiesChart = new Chart(ctx, {
      type: 'bar',
      data: {
        datasets: [{
          label: '# of real estates',
          data: cities,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        parsing: {
          xAxisKey: 'city',
          yAxisKey: 'cnt'
        } ,
        plugins: {
          title: {
            display: true,
            text: 'Real estates distribution by cities'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  
  }




}
