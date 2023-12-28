import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/response/GetCategoriesResponse';
import { DeleteCategoryAction } from 'src/app/models/interfaces/categories/event/DeleteCategoryAction';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { CategoriesFormComponent } from '../../components/categories-form/categories-form.component';

@Component({
  selector: 'app-categories-home',
  templateUrl: './categories-home.component.html',
})
export class CategoriesHomeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();
  public categoriesData: Array<GetCategoriesResponse> = [];
  private ref!: DynamicDialogRef;

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoriesService.getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if(response.length > 0) {
            this.categoriesData = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar categorias!',
            life: 2500,
          })
          this.router.navigate(['/dashboard']);
        }
      })
  }

  handleDeleteCategoryAction(event: DeleteCategoryAction): void {
    if(event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão da categoria: ${event.categoryName}`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangule',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteCategory(event.categoryId),
      })
    }
  }

  deleteCategory(id: string): void {
    this.categoriesService.deleteCategory({ categoryId: id })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.getAllCategories();
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Categoria removida com sucesso!',
            life: 2500,
          });
        },
        error: (err) => {

          console.log(err);
          this.getAllCategories();
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao remover categoria!',
            life: 2500
          });
        }
      });
    this.getAllCategories();
  }

  handleCategoryAction(event: EventAction): void {
    if(event) {
      this.ref = this.dialogService.open(CategoriesFormComponent, {
        header: event.action,
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event,
        },
      });

      this.ref.onClose
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => this.getAllCategories()
        })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
