import { Word } from 'src/common/decorators/combined.decorator';
import { Builder } from 'builder-pattern';
import { State } from 'src/entities/state.entity';
import { IsUUID } from 'class-validator';

export class StateResponse {
  static fromEntity(state: State) {
    return Builder(StateResponse)
      .id(state.id)
      .name(state.name)
      .build();
  }

  static fromEntityList(stateList: State[]) {
    const stateDtoList: StateResponse[] = [];
    stateList.forEach(city => {
      stateDtoList.push(StateResponse.fromEntity(city));
    });
    return stateDtoList;
  }

  @IsUUID()
  readonly id: string;

  @Word()
  readonly name: string;
}
