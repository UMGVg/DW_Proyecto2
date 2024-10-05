import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MarcajeComponent } from './marcaje.component';

describe('MarcajeComponent', () => {
  let component: MarcajeComponent;
  let fixture: ComponentFixture<MarcajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarcajeComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the clock correctly', () => {
    const now = new Date();
    component.updateClock();
    const expectedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const expectedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    expect(component.currentDate).toBe(expectedDate);
    expect(component.currentTime).toBe(expectedTime);
  });

  it('should call sendDateTimeToDatabase and make a POST request', () => {
    const spy = spyOn(component, 'sendDateTimeToDatabase').and.callThrough();
    component.sendDateTimeToDatabase();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to login on logout', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.logout();
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });
});
