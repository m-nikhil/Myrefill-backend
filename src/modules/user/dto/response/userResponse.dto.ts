import { Word, UUID } from 'src/common/decorators/combined.decorator';
import { Builder } from 'builder-pattern';
import { User } from 'src/entities/user.entity';

export class UserResponse {
  static fromEntity(user: User) {
    return Builder(UserResponse)
      .id(user.id)
      .fullname(user.fullname)
      .email(user.email)
      .build();
  }

  static fromEntityList(userList: User[]) {
    const userDtoList: UserResponse[] = [];
    userList.forEach(user => {
      userDtoList.push(UserResponse.fromEntity(user));
    });
    return userDtoList;
  }

  @UUID()
  readonly id: string;

  @Word()
  readonly fullname: string;

  @Word()
  readonly email: string;
}
