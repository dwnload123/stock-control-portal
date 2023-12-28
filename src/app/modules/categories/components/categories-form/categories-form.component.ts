import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { CategoryEvent } from 'src/app/models/enums/categories/CategoryEvent';
import { EditCategoryAction } from 'src/app/models/interfaces/categories/event/EditCategoryAction';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public addCategoryAction = CategoryEvent.ADD_CATEGORY_ACTION;
  public editCategoryAction = CategoryEvent.EDIT_CATEGORY_ACTION;
  public categoryAction!: { event: EditCategoryAction };
  public categoryForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  constructor(
    public ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private categoriesService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.categoryAction = this.ref.data;

    if(this.categoryAction.event.action === this.editCategoryAction && this.categoryAction.event.categoryName) {
      this.setCategoryName(this.categoryAction.event.categoryName as string);
    }
  }

  handleSubmitAddCategory(): void {
    if(this.categoryForm.value && this.categoryForm.valid) {
      const requestCreateCategory: { name: string} = {
        name: this.categoryForm.value.name as string,
      };

      this.categoriesService.createCategory(requestCreateCategory)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if(response) {
              this.categoryForm.reset();
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Categoria criada com sucesso!',
                life: 2500,
              })
            }
          },
          error: (err) => {
            console.log(err);
            this.categoryForm.reset();
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao criar categoria!',
              life: 2500,
            })
          }
        })
    }
  }

  handleSubmitCategoryAction(): void {
    if(this.categoryAction.event.action === this.addCategoryAction) {
      this.handleSubmitAddCategory();
    } else if(this.categoryAction.event.action === this.editCategoryAction) {
      this.handleSubmitEditCategory();
    }

    return;
  }

  setCategoryName(categoryName: string): void {
    if(categoryName) {
      this.categoryForm.setValue({
        name: categoryName
      });
    }
  }

  handleSubmitEditCategory(): void {
    if(this.categoryForm.value && this.categoryForm.valid && this.categoryAction.event.id) {
      const requestEditCategory: { name: string, category_id: string } = {
        name: this.categoryForm.value.name as string,
        category_id: this.categoryAction.event.id as string,
      }

      this.categoriesService.editCategoryName(requestEditCategory)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.categoryForm.reset();
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Categoria editada com sucesso!',
              life: 2500,
            })
          },
          error: (err) => {
            console.log(err);
            this.categoryForm.reset();
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao editar categoria!',
              life: 2500,
            })
          }
        })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
