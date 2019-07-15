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
  private replies = [];
  formReply: FormGroup;
  viewMore = 3;

  constructor(private fb: FormBuilder,
              private evaluationService: EvaluationService,
              private router: Router,
              private replyService: ReplyService) {
  }

  ngOnInit() {
    console.log(this.house);
    this.house.countEval = 1;
    this.formEvalution = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.formReply = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(5)]],
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
        this.formEvalution.reset();
      }, err => console.log(err));
    }
  }

  getlistEvaluation(id: number) {
    this.evaluationService.getListEvalautions(id).subscribe(next => {
      this.listEvaluation = next.reverse();
      this.getAllReply();
    }, err => console.log(err));
  }
  getAllReply() {
    for (const evalution of this.listEvaluation) {
      this.getAllReplyOfEvaluation(evalution);
    }
  }

  getAllReplyOfEvaluation(evaluation: IEvaluation) {
    this.replyService.getlistReplies(evaluation.id).subscribe(next => {
      evaluation.replies = next.reverse();
      evaluation.countRepl = 1;
    }, err => console.log(err));
  }
  reply(id: number) {
    this.replies[id] = true;
  }

  creatReply(evaluation: IEvaluation, event) {
    if (this.formReply.valid && event.keyCode === 13) {
      const {value} = this.formReply;
      console.log(value);
      // @ts-ignore
      this.replyService.create(value, evaluation.id).subscribe(next => {
        this.getAllReplyOfEvaluation(evaluation);
        this.replies[evaluation.id] = false;
        this.formReply.reset();
      }, err => console.log(err));
    }
  }

  showEval() {
    this.house.countEval++;
  }

  showRepl(evaluation: IEvaluation) {
    evaluation.countRepl++;
  }
}
