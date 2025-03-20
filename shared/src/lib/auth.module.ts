import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SharedModule } from "./shared.module";
import { JwtStrategy } from "./guards/jwt.strategy";

@Module({
    imports: [SharedModule],
    providers: [AuthService,JwtStrategy],
    exports: [AuthService,],
})
export class AuthModule { }