import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import draggable from './draggable';

@Component({
  selector: 'app-play-progress',
  templateUrl: './play-progress.component.html',
  styleUrls: ['./play-progress.component.less']
})
export class PlayProgressComponent implements OnInit {
  @Input()
  value = 0;
  @Input()
  min = 0;
  @Input()
  max = 100;
  @Input()
  step = 1;
  @Input()
  disabled = false;
  @Input()
  barHeight = 1;
  currentValue;
  @Output()
  dragEvent = new EventEmitter();
  @Output()
  dragEndEvent = new EventEmitter();
  @Output()
  dragStartEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    const thumb = document.getElementById('thumb');
    const content = document.getElementById('content');
    const getThumbPosition = () => {
      const contentBox = content.getBoundingClientRect();
      const thumbBox = thumb.getBoundingClientRect();
      return {
        left: thumbBox.left - contentBox.left,
        top: thumbBox.top - contentBox.top,
        thumbBoxLeft: thumbBox.left
      };
    };
    let dragState: any = {};
    draggable(thumb, {
      start: (event) => {
        if (this.disabled) {
          return;
        }
        const position = getThumbPosition();
        const thumbClickDetailX = event.clientX - position.thumbBoxLeft;
        this.dragStartEvent.emit();
        dragState = {
          thumbStartLeft: position.left,
          thumbStartTop: position.top,
          thumbClickDetailX: thumbClickDetailX
        };
      },
      drag: (event) => {
        if (this.disabled) {
          return;
        }
        const contentBox = content.getBoundingClientRect();
        const deltaX = event.pageX - contentBox.left - dragState.thumbStartLeft - dragState.thumbClickDetailX;
        const stepCount = Math.ceil((this.max - this.min) / this.step);
        const __newPosition = (dragState.thumbStartLeft + deltaX) - (dragState.thumbStartLeft + deltaX) % (contentBox.width / stepCount);
        let newProgress = __newPosition / contentBox.width;
        if (newProgress < 0) {
          newProgress = 0;
        } else if (newProgress > 1) {
          newProgress = 1;
        }
        this.currentValue = Math.round(this.min + newProgress * (this.max - this.min));
        this.dragEvent.emit({currentTime: Math.round(this.min + newProgress * (this.max - this.min))});
      },
      end: () => {
        if (this.disabled) {
          return;
        }
        this.dragEndEvent.emit({currentTime: this.currentValue});
        dragState = {};
      }
    });
    const that = this;
    const newPosition = function (event) {
      const contentBox = content.getBoundingClientRect();
      const deltaX = event.pageX - contentBox.left - thumb.offsetWidth;
      const stepCount = Math.ceil((that.max - that.min) / that.step);
      const _newPosition = deltaX - (deltaX) % (contentBox.width / stepCount);
      const newProgress = _newPosition / contentBox.width;
      that.dragEndEvent.emit({currentTime: Math.round(that.min + newProgress * (that.max - that.min))});
    };
    const runWay = document.getElementById('runWay');
    runWay.addEventListener('click', newPosition);
    const progress = document.getElementById('progress');
    progress.addEventListener('click', newPosition);

  }
}
