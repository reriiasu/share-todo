import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodoManagePage } from './todo-manage.page';

describe('TodoPage', () => {
  let component: TodoManagePage;
  let fixture: ComponentFixture<TodoManagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoManagePage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
