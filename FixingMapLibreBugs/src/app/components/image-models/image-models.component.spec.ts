import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageModelsComponent } from './image-models.component';

describe('ImageModelsComponent', () => {
  let component: ImageModelsComponent;
  let fixture: ComponentFixture<ImageModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageModelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
