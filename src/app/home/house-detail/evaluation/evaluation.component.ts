import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EvaluationService} from '../../../service/evaluation.service';
import {IHouse} from '../../../model/House';
import {IEvaluation} from '../../../model/Evaluation';
import {ReplyService} from '../../../service/reply.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {

  formEvalution: FormGroup;
  listEvaluation: IEvaluation[];
  // @ts-ignore
  @Input() house: IHouse;
  private traloi = false;

  constructor(private fb: FormBuilder,
              private evaluationService: EvaluationService,
              private router: Router,
              private replyService: ReplyService) {
  }

  ngOnInit() {
    console.log(this.house);
    this.formEvalution = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.getlistEvaluation(this.house.id);
  }

  creatEvalution() {
    if (this.formEvalution.valid) {
      const {value} = this.formEvalution;
      console.log(value);
      // @ts-ignore
      this.evaluationService.create(value, this.house.id).subscribe(next => {
        this.getlistEvaluation(this.house.id);
      }, err => console.log(err));
    }
  }

  getlistEvaluation(id: number) {
    this.evaluationService.getListEvalautions(id).subscribe(next => {
      this.listEvaluation = next;
      this.getAllReply();
    }, err => console.log(err));
  }
  getAllReply() {
    for (const evalution of this.listEvaluation) {
      this.replyService.getlistReplies(evalution.id).subscribe(next => {
        evalution.replies = next;
      }, err => console.log(err));
    }
  }

  traLoi(id: number) {
    this.traloi = true;
  }
}
