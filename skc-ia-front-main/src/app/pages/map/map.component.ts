import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MapValo } from 'src/app/models/maps/map.interface';
import { MapsService } from 'src/app/services/maps.service';

@Component({
  selector: 'vex-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  backgroundImage: any;
  mapName!: string;
  map!: MapValo;

  constructor(
    private readonly mapService: MapsService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.mapName = params.get('map');
      this.map = this.mapService.maps.filter(m => m.urlName === this.mapName)[0];
      this.backgroundImage = `url(/assets/maps/background-${this.map.urlName}.png)`;
      console.log(this.map);
    })
  }
}
