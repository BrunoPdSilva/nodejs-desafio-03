-- CreateTable
CREATE TABLE "org" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "representative" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "street" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "idependence" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "energy" INTEGER NOT NULL,
    "space_required" TEXT NOT NULL,
    "requirements" TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "org_id_key" ON "org"("id");

-- CreateIndex
CREATE UNIQUE INDEX "org_name_key" ON "org"("name");

-- CreateIndex
CREATE UNIQUE INDEX "org_email_key" ON "org"("email");

-- CreateIndex
CREATE UNIQUE INDEX "org_contact_key" ON "org"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "pets_id_key" ON "pets"("id");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
