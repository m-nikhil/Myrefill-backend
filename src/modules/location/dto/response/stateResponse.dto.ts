import { Word, UUID } from 'src/common/decorators/combined.decorator';
import { Builder } from 'builder-pattern';
import { State } from 'src/entities/state.entity';

export class StateResponse {
  static fromEntity(state: State) {
    return Builder(State)
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

  @UUID()
  readonly id: string;

  @Word()
  readonly name: string;
}
