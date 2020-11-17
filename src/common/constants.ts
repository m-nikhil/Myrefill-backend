import { Injectable } from "@nestjs/common";

@Injectable()
export class Constants {
    public static readonly REDEEM_LIMIT: number = 20;
}