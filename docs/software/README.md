# Реалізація інформаційного та програмного забезпечення

## SQL-скрипт для створення початкового наповнення бази даних

_migrate.sql_
```sql
-- CreateTable
CREATE TABLE `project` (
    `id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` MEDIUMTEXT NOT NULL,

    PRIMARY KEY (`id`)
);

-- CreateTable
CREATE TABLE `project_member` (
    `id` VARCHAR(191) NOT NULL,
    `project_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
);

-- CreateTable
CREATE TABLE `task` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` MEDIUMTEXT NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `deadline` DATETIME(0) NULL,
    `project_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
);

-- CreateTable
CREATE TABLE `task_comment` (
    `id` VARCHAR(191) NOT NULL,
    `text` MEDIUMTEXT NOT NULL,
    `task_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
);

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(320) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `avatar` MEDIUMTEXT NOT NULL,
    `blocked` BIT(1) NOT NULL DEFAULT b'0',

    PRIMARY KEY (`id`)
);

-- CreateTable
CREATE TABLE `assignment` (
    `id` VARCHAR(191) NOT NULL,
    `task_id` INTEGER NOT NULL,
    `project_member_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
    );

-- CreateTable
CREATE TABLE `suport_request` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `topic` VARCHAR(255) NOT NULL,
    `description` MEDIUMTEXT NOT NULL,

    PRIMARY KEY (`id`)
);

-- CreateTable
CREATE TABLE `support_request_answer` (
    `id` VARCHAR(191) NOT NULL,
    `feedback` MEDIUMTEXT NOT NULL,
    `support_request_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
);

-- CreateTable
CREATE TABLE `connect_to_project_request` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `project_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
);

-- CreateTable
CREATE TABLE `role` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `project_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
);

-- CreateTable
CREATE TABLE `project_member_role` (
   `id` VARCHAR(191) NOT NULL,
   `role_id` INTEGER NOT NULL,
   `project_member_id` INTEGER NOT NULL,

   PRIMARY KEY (`id`)
);

-- CreateTable
CREATE TABLE `grant` (
    `id` VARCHAR(191) NOT NULL,
    `permission` VARCHAR(255) NOT NULL,
    `role_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
);

-- AddForeignKey
ALTER TABLE `project_member`
    ADD CONSTRAINT `project_member_project_id_fkey`
    FOREIGN KEY (`project_id`)
    REFERENCES `project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_member`
    ADD CONSTRAINT `project_member_user_id_fkey`
    FOREIGN KEY (`user_id`)
    REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task`
    ADD CONSTRAINT `task_project_id_fkey`
    FOREIGN KEY (`project_id`)
    REFERENCES `project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task_comment`
    ADD CONSTRAINT `task_comment_task_id_fkey`
    FOREIGN KEY (`task_id`)
    REFERENCES `task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assignment`
    ADD CONSTRAINT `assignment_task_id_fkey`
    FOREIGN KEY (`task_id`)
    REFERENCES `task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assignment`
    ADD CONSTRAINT `assignment_project_member_id_fkey`
    FOREIGN KEY (`project_member_id`)
    REFERENCES `project_member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `suport_request`
    ADD CONSTRAINT `suport_request_user_id_fkey`
    FOREIGN KEY (`user_id`)
    REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `support_request_answer`
    ADD CONSTRAINT `support_request_answer_support_request_id_fkey`
    FOREIGN KEY (`support_request_id`)
    REFERENCES `suport_request`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `connect_to_project_request`
    ADD CONSTRAINT `connect_to_project_request_user_id_fkey`
    FOREIGN KEY (`user_id`)
    REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `connect_to_project_request`
    ADD CONSTRAINT `connect_to_project_request_project_id_fkey`
    FOREIGN KEY (`project_id`)
    REFERENCES `project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role`
    ADD CONSTRAINT `role_project_id_fkey`
    FOREIGN KEY (`project_id`)
    REFERENCES `project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_member_role`
    ADD CONSTRAINT `project_member_role_role_id_fkey`
    FOREIGN KEY (`role_id`)
    REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_member_role`
    ADD CONSTRAINT `project_member_role_project_member_id_fkey`
    FOREIGN KEY (`project_member_id`)
    REFERENCES `project_member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grant`
    ADD CONSTRAINT `grant_role_id_fkey`
    FOREIGN KEY (`role_id`)
    REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
```

_seed.sql_

```sql
BEGIN;

INSERT INTO `user` VALUES
    ('01aac9a4-9fa0-4259-9cb7-96ae04493c00','Alfreda.Kovacek','2IeUPM2PuuxTSWr','Harry79@gmail.com','Uriel','Beier','https://avatars.githubusercontent.com/u/84658049',_binary '\0'),
    ('ac271f82-76f6-4cde-be0b-5d22c05ef026','Bertha.Bogisich69','WtxUZUx7zlckhh_','Ezekiel_Pacocha25@yahoo.com','Kiley','Marvin','https://avatars.githubusercontent.com/u/92353484',_binary '\0'),
    ('e2217349-7e03-46bd-a504-f1e2067cae6c','Eleonore.Kassulke40','JWalSbqVHoE1Ieg','Ceasar60@gmail.com','Paris','Leannon','https://avatars.githubusercontent.com/u/416693',_binary '\0'),
    ('ed8b1607-6901-45f7-837c-51a5d838559c','Carolyn.Hagenes24','fIfystAB8TkB434','Cayla.Oberbrunner52@hotmail.com','Eloy','Stroman','https://avatars.githubusercontent.com/u/7719973',_binary '\0'),
    ('ff3ea8d2-e289-4e51-a583-70e632b96543','Eloy.Mills14','0al8wG4h2W57FDW','Ofelia_Gleichner@gmail.com','Constance','Bode','https://avatars.githubusercontent.com/u/4484700',_binary '\0');


INSERT INTO `project` VALUES
    ('37385665-6efc-4880-8769-bae6df1fe3fc','active','custom','Amiculum sto culpa utrimque.'),
    ('ebe00229-6821-45bc-8046-9c3706592dd4','active','hepatitis','Crinis arcus agnitio ater defleo votum aestivus cura.');


INSERT INTO `connect_to_project_request` VALUES
    ('9543a4f0-8b16-456f-b1a5-221ab9489ea4','ff3ea8d2-e289-4e51-a583-70e632b96543','ebe00229-6821-45bc-8046-9c3706592dd4');


INSERT INTO `project_member` VALUES
    ('0917dc05-f777-44e0-8c2e-699f69afe37e','37385665-6efc-4880-8769-bae6df1fe3fc','01aac9a4-9fa0-4259-9cb7-96ae04493c00'),
    ('0adcac73-075e-4be9-881c-3663d365642c','ebe00229-6821-45bc-8046-9c3706592dd4','e2217349-7e03-46bd-a504-f1e2067cae6c'),
    ('5b81c65a-91a6-47bf-b8be-bac234bc3fde','ebe00229-6821-45bc-8046-9c3706592dd4','ed8b1607-6901-45f7-837c-51a5d838559c'),
    ('857761ed-8c62-4946-b24f-73aff9ff3c39','37385665-6efc-4880-8769-bae6df1fe3fc','ac271f82-76f6-4cde-be0b-5d22c05ef026');


INSERT INTO `task` VALUES
    ('617cd0ac-ea33-4d10-8422-6080a9149ff0','vitae','Curriculum tabula subseco absum. Cervus trepide quaerat. Aeger cunctatio rerum arbustum.','todo','2024-08-14 02:23:34','ebe00229-6821-45bc-8046-9c3706592dd4'),
    ('8a4cc33b-5ad9-4683-bfeb-1d66cbf4c6d4','cursus','Desidero considero cruciamentum coniuratio magnam vobis. Crinis varietas unde curvo apud aperio. Ter audentia tristis via adflicto.','todo','2024-07-25 03:43:09','37385665-6efc-4880-8769-bae6df1fe3fc'),
    ('9df91dfc-8798-45fc-a79c-68ced190f6e1','canis','Certe cito viscus nesciunt casus dolores supellex cibus. Nobis averto depono validus. Corrumpo maxime chirographum conqueror trucido pel.','todo','2025-10-26 07:17:02','37385665-6efc-4880-8769-bae6df1fe3fc'),
    ('b1e683ac-d4e9-45c6-a920-6ff6edf88a8e','cunabula','Talus pax sollicito summisse advoco claro adeptio. Vivo tergiversatio est qui tutamen. Vulnus conturbo cupio.','todo','2025-02-08 01:29:55','ebe00229-6821-45bc-8046-9c3706592dd4');


INSERT INTO `task_comment` VALUES
    ('038147de-4fef-4b24-be8f-1a66c965cd83','Tempore vulticulus vis debitis enim utique carbo quisquam. Ante absum ventosus. Defaeco aut aedificium articulus. Compello capitulus officia nulla sordeo. Succedo timor currus debitis velum. Enim commodo alveus culpa delectus demens sui subseco umerus praesentium. Repellat tardus amo bellum conduco thesaurus charisma aiunt.','9df91dfc-8798-45fc-a79c-68ced190f6e1','857761ed-8c62-4946-b24f-73aff9ff3c39'),
    ('62750d0b-dfd8-4ba2-967d-7c723450508b','Amoveo clamo tamdiu accusantium usque tamquam tergum. Thalassinus termes tametsi. Alioqui magni spoliatio totus basium curiositas a. Thesaurus totus tego spectaculum sufficio argumentum. Templum qui aestus collum alo vorax crastinus conspergo defessus sint. Suspendo centum super addo cito. Tremo adstringo depopulo correptius.','617cd0ac-ea33-4d10-8422-6080a9149ff0','0adcac73-075e-4be9-881c-3663d365642c'),
    ('90d3dc3b-2ea3-41d3-9fd5-b357208ebc21','Angulus cometes apparatus comminor inflammatio ter comitatus vinculum. Vigor quasi amet. Suppellex eos uter sursum arca teres alius quisquam aeneus. Casso verecundia depulso ceno possimus. Dolores amiculum adulatio arceo desparatus vacuus cohors adsuesco. Amplus vitium totidem adopto creo denique cupressus. Crudelis tepidus vorago virgo strues quam tergeo.','9df91dfc-8798-45fc-a79c-68ced190f6e1','0917dc05-f777-44e0-8c2e-699f69afe37e'),
    ('b7fe557e-d4f7-4bba-bbd4-f61c41663cbf','Ars delinquo ab. Statim vestigium aeger. Aegrotatio bellum torqueo creber accusantium velum. Deorsum cum auctus. Vis vilis vilis complectus certus conscendo armarium quas. Coaegresco cunctatio bellicus patior natus corroboro summopere cunctatio acerbitas vomer. Tristis vilitas peior.','b1e683ac-d4e9-45c6-a920-6ff6edf88a8e','5b81c65a-91a6-47bf-b8be-bac234bc3fde');


INSERT INTO `assignment` VALUES
    ('24ba8ad9-b269-4bcf-94a4-1dc832e8b061','b1e683ac-d4e9-45c6-a920-6ff6edf88a8e','0adcac73-075e-4be9-881c-3663d365642c'),
    ('2a173791-18b7-42c5-a4be-c25671a53092','9df91dfc-8798-45fc-a79c-68ced190f6e1','0917dc05-f777-44e0-8c2e-699f69afe37e'),
    ('4330d27b-1297-407f-a6e5-7efcea73c4e0','9df91dfc-8798-45fc-a79c-68ced190f6e1','857761ed-8c62-4946-b24f-73aff9ff3c39'),
    ('c0597b8c-21af-412d-8fa9-90cf9c03e044','8a4cc33b-5ad9-4683-bfeb-1d66cbf4c6d4','5b81c65a-91a6-47bf-b8be-bac234bc3fde');

INSERT INTO `role` VALUES
    ('0ac0e86e-3178-42e4-b624-875afa7328ac','member','37385665-6efc-4880-8769-bae6df1fe3fc'),
    ('5aefca52-a8c7-4150-b72a-96c248758784','manager','ebe00229-6821-45bc-8046-9c3706592dd4'),
    ('9a108f4a-38ea-422c-8f51-3bbe9acc62ae','admin','37385665-6efc-4880-8769-bae6df1fe3fc'),
    ('a69443b7-c68c-4e0e-908f-d66170cdede7','member','37385665-6efc-4880-8769-bae6df1fe3fc'),
    ('abcf3f91-1bb3-429d-a816-d1b1d04a14b6','manager','ebe00229-6821-45bc-8046-9c3706592dd4'),
    ('e8bc20c7-c479-43cc-afe3-e67c4deff572','admin','ebe00229-6821-45bc-8046-9c3706592dd4');


INSERT INTO `grant` VALUES
    ('09adb965-1282-4e7b-bcc9-93e3db0ea6b0','read','a69443b7-c68c-4e0e-908f-d66170cdede7'),
    ('30c3e00c-4346-4c87-bae6-68c0129cbc71','create','9a108f4a-38ea-422c-8f51-3bbe9acc62ae'),
    ('ab005d0f-bc4a-49d9-bc62-d9aae977377a','delete','0ac0e86e-3178-42e4-b624-875afa7328ac'),
    ('b014f61d-c834-4c63-80f7-701decfedeb8','read','e8bc20c7-c479-43cc-afe3-e67c4deff572'),
    ('caae45a4-8328-463f-ade0-28c83ddc75cc','create','abcf3f91-1bb3-429d-a816-d1b1d04a14b6'),
    ('cd89a1a8-d581-4dc4-a314-1f0766618d22','delete','5aefca52-a8c7-4150-b72a-96c248758784');


INSERT INTO `project_member_role` VALUES
    ('369ec90f-2ff4-4279-a09b-b536cc9ead4d','a69443b7-c68c-4e0e-908f-d66170cdede7','5b81c65a-91a6-47bf-b8be-bac234bc3fde'),
    ('a07920d3-e3fc-496b-8492-cabff398936f','5aefca52-a8c7-4150-b72a-96c248758784','0adcac73-075e-4be9-881c-3663d365642c'),
    ('b7a74192-e1e7-4839-9a15-c01b6bea2d5a','0ac0e86e-3178-42e4-b624-875afa7328ac','857761ed-8c62-4946-b24f-73aff9ff3c39'),
    ('d9755074-2734-486c-a2a6-51aa2415ed6d','0ac0e86e-3178-42e4-b624-875afa7328ac','0917dc05-f777-44e0-8c2e-699f69afe37e'),
    ('e28fa866-d9cc-408e-aa29-fc6c1dc0f817','a69443b7-c68c-4e0e-908f-d66170cdede7','0adcac73-075e-4be9-881c-3663d365642c'),
    ('ef17e2ce-9c9b-47a8-badc-4231e7c5c51c','9a108f4a-38ea-422c-8f51-3bbe9acc62ae','0917dc05-f777-44e0-8c2e-699f69afe37e');


INSERT INTO `suport_request` VALUES
    ('4fbe4541-9235-4e80-a9c9-9fd1d3117267','ac271f82-76f6-4cde-be0b-5d22c05ef026','accelerator','Inventore vapulus beatus tertius sono cerno. Titulus alienus coaegresco velit cunctatio corrumpo. Ulterius amoveo vaco adfero cribro torrens.'),
    ('5deddba6-2073-494b-af56-9a14f3847888','ed8b1607-6901-45f7-837c-51a5d838559c','coil','Umbra vesica arbor turbo centum cubitum caput mollitia spero. Vel via delibero autem decimus denuo. Taedium aggero sumptus commodo usque tabella.'),
    ('dfbf873b-de0d-493f-87dc-4ef53ecfd7ce','01aac9a4-9fa0-4259-9cb7-96ae04493c00','stock','Exercitationem asper repellendus curo cursim. Subnecto aeger vae acidus beneficium. Vae aut quod.');


INSERT INTO `support_request_answer` VALUES
    ('e29bce8b-e012-4b78-a552-9b547a4d275b','Admitto fugit condico caritas exercitationem apud eligendi quo desipio caterva. Accendo aurum impedit. Quo verbera subnecto a deficio. Verbum textilis concedo viduo. Supellex cerno tollo aperiam amor vinum.','4fbe4541-9235-4e80-a9c9-9fd1d3117267'),
    ('eaef85fe-6d41-4ad3-a874-0df59cf9f697','Vulgaris claudeo depereo incidunt. Antiquus aeternus depopulo civis coerceo considero atqui exercitationem conculco sum. Annus aureus voro nisi tenetur. Vado decipio vinum viriliter veritatis adinventitias aspicio via nulla. Tamquam adduco tredecim sollers appello bardus.','dfbf873b-de0d-493f-87dc-4ef53ecfd7ce');


COMMIT;
```

## RESTfull сервіс для управління даними

### Схема бази даних Prisma ORM

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Project {
  id                       String                    @id @default(uuid())
  status                   String                    @db.VarChar(255)
  name                     String                    @db.VarChar(255)
  description              String                    @db.MediumText
  connectToProjectRequests ConnectToProjectRequest[]
  projectMembers           ProjectMember[]
  roles                    Role[]
  tasks                    Task[]

  @@map("project")
}

model ProjectMember {
  id                 String              @id @default(uuid())
  projectId          String              @map("project_id")
  userId             String              @map("user_id")
  assignments        Assignment[]
  project            Project             @relation(fields: [projectId], references: [id], onDelete: Cascade)
  user               User                @relation(fields: [userId], references: [id], onDelete: Cascade)
  projectMemberRoles ProjectMemberRole[]
  taskComments       TaskComment[]

  @@index([projectId], map: "project_member_project_id_fkey")
  @@index([userId], map: "project_member_user_id_fkey")
  @@map("project_member")
}

model Task {
  id           String        @id @default(uuid())
  name         String        @db.VarChar(255)
  description  String        @db.MediumText
  status       String        @db.VarChar(255)
  deadline     DateTime?     @db.DateTime(0)
  projectId    String        @map("project_id")
  assignments  Assignment[]
  project      Project       @relation(fields: [projectId], references: [id], onDelete: Cascade)
  taskComments TaskComment[]

  @@index([projectId], map: "task_project_id_fkey")
  @@map("task")
}

model TaskComment {
  id              String        @id @default(uuid())
  text            String        @db.MediumText
  taskId          String        @map("task_id")
  projectMemberId String        @map("project_member_id")
  projectMember   ProjectMember @relation(fields: [projectMemberId], references: [id], onDelete: Cascade)
  task            Task          @relation(fields: [taskId], references: [id], onDelete: Cascade)

  @@index([projectMemberId], map: "task_comment_project_member_id_fkey")
  @@index([taskId], map: "task_comment_task_id_fkey")
  @@map("task_comment")
}

model User {
  id                       String                    @id @default(uuid())
  username                 String                    @db.VarChar(255)
  password                 String                    @db.VarChar(255)
  email                    String                    @db.VarChar(320)
  firstName                String                    @map("first_name") @db.VarChar(255)
  lastName                 String                    @map("last_name") @db.VarChar(255)
  avatar                   String?                   @db.MediumText
  blocked                  Boolean                   @default(dbgenerated("b'0'")) @db.Bit(1)
  connectToProjectRequests ConnectToProjectRequest[]
  projectMembers           ProjectMember[]
  supportRequests          SupportRequest[]

  @@map("user")
}

model Assignment {
  id              String        @id @default(uuid())
  taskId          String        @map("task_id")
  projectMemberId String        @map("project_member_id")
  projectMember   ProjectMember @relation(fields: [projectMemberId], references: [id], onDelete: Cascade)
  task            Task          @relation(fields: [taskId], references: [id], onDelete: Cascade)

  @@index([projectMemberId], map: "assignment_project_member_id_fkey")
  @@index([taskId], map: "assignment_task_id_fkey")
  @@map("assignment")
}

model SupportRequest {
  id                     String                 @id @default(uuid())
  userId                 String                 @map("user_id")
  topic                  String                 @db.VarChar(255)
  description            String                 @db.MediumText
  user                   User                   @relation(fields: [userId], references: [id], onDelete: Cascade)
  supportRequestsAnswers SupportRequestAnswer[]

  @@index([userId], map: "suport_request_user_id_fkey")
  @@map("suport_request")
}

model SupportRequestAnswer {
  id               String         @id @default(uuid())
  feedback         String         @db.MediumText
  supportRequestId String         @map("support_request_id")
  supportRequest   SupportRequest @relation(fields: [supportRequestId], references: [id], onDelete: Cascade)

  @@index([supportRequestId], map: "support_request_answer_support_request_id_fkey")
  @@map("support_request_answer")
}

model ConnectToProjectRequest {
  id        String  @id @default(uuid())
  userId    String  @map("user_id")
  projectId String  @map("project_id")
  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  user      User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([projectId], map: "connect_to_project_request_project_id_fkey")
  @@index([userId], map: "connect_to_project_request_user_id_fkey")
  @@map("connect_to_project_request")
}

model Role {
  id                 String              @id @default(uuid())
  name               String              @db.VarChar(255)
  projectId          String              @map("project_id")
  grants             Grant[]
  projectMemberRoles ProjectMemberRole[]
  project            Project             @relation(fields: [projectId], references: [id], onDelete: Cascade)

  @@index([projectId], map: "role_project_id_fkey")
  @@map("role")
}

model ProjectMemberRole {
  id              String        @id @default(uuid())
  roleId          String        @map("role_id")
  projectMemberId String        @map("project_member_id")
  projectMember   ProjectMember @relation(fields: [projectMemberId], references: [id], onDelete: Cascade)
  role            Role          @relation(fields: [roleId], references: [id], onDelete: Cascade)

  @@index([projectMemberId], map: "project_member_role_project_member_id_fkey")
  @@index([roleId], map: "project_member_role_role_id_fkey")
  @@map("project_member_role")
}

model Grant {
  id         String @id @default(uuid())
  permission String @db.VarChar(255)
  roleId     String @map("role_id")
  role       Role   @relation(fields: [roleId], references: [id], onDelete: Cascade)

  @@index([roleId], map: "grant_role_id_fkey")
  @@map("grant")
}
```
### Головний файл програми

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT ?? 3000;

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const swaggerConfig = new DocumentBuilder()
      .setTitle('Project Management API')
      .setDescription('API documentation for Project and ConnectToProjectRequest')
      .setVersion('1')
      .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => console.info(`Swagger: http://localhost:${port}/api`));
}

bootstrap();
```

### Головний модуль програми

```typescript
import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma.module';
import { ProjectModule } from './modules/project.module';
import { ConnectToProjectRequestModule } from './modules/connect-to-project-request.module';

@Module({
  imports: [PrismaModule, ProjectModule, ConnectToProjectRequestModule],
})
export class AppModule {}
```

### Підключення до бази даних

#### Сервіс
```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
}
```

#### Модуль
```typescript
import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}
```

### Project

#### Контролер
```typescript
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProjectService } from '../services/project.service';
import { CreateProjectDTO } from '../dtos/create-project.dto';
import { UpdateProjectDTO } from '../dtos/update-project.dto';
import { ProjectResponse } from '../../responses/project.response';

@ApiTags('Project')
@Controller('/projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @ApiOperation({
        summary: 'Get all projects',
        description: 'Endpoint for getting all projects',
    })
    @ApiOkResponse({
        type: [ProjectResponse],
    })
    @Get()
    getAll() {
        return this.projectService.getAll();
    }

    @ApiOperation({
        summary: 'Get project by id',
        description: 'Endpoint for getting project by id',
    })
    @ApiOkResponse({
        type: ProjectResponse,
    })
    @ApiBadRequestResponse({
        description: `\n
    InvalidEntityIdException:
      Project with such id not found`,
    })
    @ApiParam({
        name: 'id',
        description: 'Id of the project to get',
    })
    @Get('/:id')
    get(@Param('id') id: string) {
        return this.projectService.getById(id);
    }

    @ApiOperation({
        summary: 'Create a new project',
        description: 'Endpoint for creating a new project',
    })
    @ApiOkResponse({
        type: ProjectResponse,
    })
    @ApiBadRequestResponse({
        description: `\n
    InvalidBodyException:
      Project name cannot be empty
      Project status cannot be empty`,
    })
    @Post()
    create(@Body() body: CreateProjectDTO) {
        return this.projectService.create(body);
    }

    @ApiOperation({
        summary: 'Update project by id',
        description: 'Endpoint for updating a project by id',
    })
    @ApiOkResponse({
        type: ProjectResponse,
    })
    @ApiBadRequestResponse({
        description: `\n
    InvalidEntityIdException:
      Project with such id not found`,
    })
    @ApiParam({
        name: 'id',
        description: 'Id of the project to update',
    })
    @Patch('/:id')
    update(@Param('id') id: string, @Body() body: UpdateProjectDTO) {
        return this.projectService.updateById(id, body);
    }

    @ApiOperation({
        summary: 'Delete project by id',
        description: 'Endpoint for deleting a project by id',
    })
    @ApiOkResponse({
        description: 'Project successfully deleted',
    })
    @ApiBadRequestResponse({
        description: `\n
    InvalidEntityIdException:
      Project with such id not found`,
    })
    @ApiParam({
        name: 'id',
        description: 'Id of the project to delete',
    })
    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.projectService.deleteById(id);
    }
}
```

#### Сервіс

```typescript
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateProjectDTO } from '../dtos/create-project.dto';
import { UpdateProjectDTO } from '../dtos/update-project.dto';

@Injectable()
export class ProjectService {
    constructor(private readonly prisma: PrismaService) {}

    // Отримати всі проекти
    getAll() {
        return this.prisma.project.findMany();
    }

    // Отримати проект за ID
    async getById(id: string) {
        const project = await this.prisma.project.findUnique({ where: { id } });
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} does not exist`);
        }
        return project;
    }

    // Створити новий проект
    async create(data: CreateProjectDTO) {
        try {
            return await this.prisma.project.create({ data });
        } catch (error) {
            throw new BadRequestException('Error creating the project. Please check the data.');
        }
    }

    // Оновити проект за ID
    async updateById(id: string, data: UpdateProjectDTO) {
        const project = await this.prisma.project.findUnique({ where: { id } });
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} does not exist`);
        }

        return this.prisma.project.update({ where: { id }, data });
    }

    // Видалити проект за ID
    async deleteById(id: string) {
        const project = await this.prisma.project.findUnique({ where: { id } });
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} does not exist`);
        }

        return this.prisma.project.delete({ where: { id } });
    }
}
```

#### DTO для створення

```typescript
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { validationOptionsMsg } from '../../utils';

export class CreateProjectDTO {
    @ApiProperty({
        description: 'Name of the project',
    })
    @IsNotEmpty(validationOptionsMsg('Project name cannot be empty'))
    @IsString(validationOptionsMsg('Project name must be a string'))
    @MinLength(3, validationOptionsMsg('Project name is too short (min: 3)'))
    @MaxLength(50, validationOptionsMsg('Project name is too long (max: 50)'))
    name: string;

    @ApiProperty({
        description: 'Description of the project',
    })
    @IsNotEmpty(validationOptionsMsg('Description cannot be empty'))
    @IsString(validationOptionsMsg('Description must be a string'))
    description: string;

    @ApiProperty({
        description: 'Status of the project',
    })
    @IsNotEmpty(validationOptionsMsg('Status cannot be empty'))
    @IsString(validationOptionsMsg('Status must be a string'))
    status: string;
}
```

#### DTO для оновлення

```typescript
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { validationOptionsMsg } from '../../utils';

export class UpdateProjectDTO {
    @ApiPropertyOptional({
        description: 'Name of the project',
    })
    @IsOptional()
    @IsString(validationOptionsMsg('Project name must be a string'))
    @MinLength(3, validationOptionsMsg('Project name is too short (min: 3)'))
    @MaxLength(50, validationOptionsMsg('Project name is too long (max: 50)'))
    name?: string;

    @ApiPropertyOptional({
        description: 'Description of the project',
    })
    @IsOptional()
    @IsString(validationOptionsMsg('Description must be a string'))
    description?: string;

    @ApiPropertyOptional({
        description: 'Status of the project',
    })
    @IsOptional()
    @IsString(validationOptionsMsg('Status must be a string'))
    status?: string;
}
```

#### Модуль

```typescript
import { Module } from '@nestjs/common';
import { ProjectController } from '../api/controllers/project.controller';
import { ProjectService } from '../api/services/project.service';

@Module({
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule {}
```

### Connect to project request

#### Контролер

```typescript
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ConnectToProjectRequestService } from '../services/connect-to-project-request.service';
import { CreateConnectToProjectRequestDTO } from '../dtos/create-connect-to-project-request.dto';
import { ConnectToProjectRequestResponse } from '../../responses/connect-to-project-request.response';

@ApiTags('Connect to Project Request')
@Controller('/connect-to-project-requests')
export class ConnectToProjectRequestController {
    constructor(private readonly connectToProjectRequestService: ConnectToProjectRequestService) {}

    @ApiOperation({
        summary: 'Get all connect-to-project requests',
        description: 'Endpoint for getting all connect-to-project requests',
    })
    @ApiOkResponse({
        type: [ConnectToProjectRequestResponse],
    })
    @Get()
    getAll() {
        return this.connectToProjectRequestService.getAll();
    }

    @ApiOperation({
        summary: 'Get connect-to-project request by id',
        description: 'Endpoint for getting a connect-to-project request by id',
    })
    @ApiOkResponse({
        type: ConnectToProjectRequestResponse,
    })
    @ApiBadRequestResponse({
        description: `\n
    InvalidEntityIdException:
      Connect-to-project request with such id not found`,
    })
    @ApiParam({
        name: 'id',
        description: 'Id of the connect-to-project request to get',
    })
    @Get('/:id')
    get(@Param('id') id: string) {
        return this.connectToProjectRequestService.getById(id);
    }

    @ApiOperation({
        summary: 'Create a new connect-to-project request',
        description: 'Endpoint for creating a new connect-to-project request',
    })
    @ApiOkResponse({
        type: ConnectToProjectRequestResponse,
    })
    @ApiBadRequestResponse({
        description: `\n
    InvalidBodyException:
      User id cannot be empty
      Project id cannot be empty`,
    })
    @Post()
    create(@Body() body: CreateConnectToProjectRequestDTO) {
        return this.connectToProjectRequestService.create(body);
    }

    @ApiOperation({
        summary: 'Delete connect-to-project request by id',
        description: 'Endpoint for deleting a connect-to-project request by id',
    })
    @ApiOkResponse({
        description: 'Connect-to-project request successfully deleted',
    })
    @ApiBadRequestResponse({
        description: `\n
    InvalidEntityIdException:
      Connect-to-project request with such id not found`,
    })
    @ApiParam({
        name: 'id',
        description: 'Id of the connect-to-project request to delete',
    })
    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.connectToProjectRequestService.deleteById(id);
    }
}
```

#### Сервіс

```typescript
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateConnectToProjectRequestDTO } from '../dtos/create-connect-to-project-request.dto';

@Injectable()
export class ConnectToProjectRequestService {
    constructor(private readonly prisma: PrismaService) {}

    // Отримати всі запити
    getAll() {
        return this.prisma.connectToProjectRequest.findMany();
    }

    // Отримати запит за ID
    async getById(id: string) {
        const request = await this.prisma.connectToProjectRequest.findUnique({ where: { id } });
        if (!request) {
            throw new NotFoundException(`Connect-to-project request with ID ${id} does not exist`);
        }
        return request;
    }

    // Створити новий запит
    async create(data: CreateConnectToProjectRequestDTO) {
        try {
            return await this.prisma.connectToProjectRequest.create({ data });
        } catch (error) {
            if (error.code === 'P2003') { // Foreign key constraint failed
                throw new BadRequestException('Invalid userId or projectId. Foreign key constraint failed.');
            }
            throw new BadRequestException('Error creating the request. Please check the data.');
        }
    }

    // Видалити запит за ID
    async deleteById(id: string) {
        const request = await this.prisma.connectToProjectRequest.findUnique({ where: { id } });
        if (!request) {
            throw new NotFoundException(`Request with ID ${id} does not exist`);
        }

        return this.prisma.connectToProjectRequest.delete({ where: { id } });
    }
}
```

#### DTO для створення

```typescript
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { validationOptionsMsg } from '../../utils';

export class CreateConnectToProjectRequestDTO {
    @ApiProperty({
        description: 'ID of the user making the request',
    })
    @IsNotEmpty(validationOptionsMsg('User ID cannot be empty'))
    @IsUUID('4', validationOptionsMsg('User ID must be a valid UUID'))
    userId: string;

    @ApiProperty({
        description: 'ID of the project to connect to',
    })
    @IsNotEmpty(validationOptionsMsg('Project ID cannot be empty'))
    @IsUUID('4', validationOptionsMsg('Project ID must be a valid UUID'))
    projectId: string;
}
```

#### Модуль

```typescript
import { Module } from '@nestjs/common';
import { ConnectToProjectRequestController } from '../api/controllers/connect-to-project-request.controller';
import { ConnectToProjectRequestService } from '../api/services/connect-to-project-request.service';

@Module({
    controllers: [ConnectToProjectRequestController],
    providers: [ConnectToProjectRequestService],
})
export class ConnectToProjectRequestModule {}
```
