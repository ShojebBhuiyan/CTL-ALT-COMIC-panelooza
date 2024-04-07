-- CreateTable
CREATE TABLE "RenderedScene" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "assetUrl" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "maskUrl" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RenderedScene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageSegment" (
    "id" TEXT NOT NULL,
    "box" DOUBLE PRECISION[],
    "color" DOUBLE PRECISION[],
    "label" TEXT NOT NULL,
    "score" DOUBLE PRECISION[],
    "renderedSceneId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImageSegment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RenderedScene" ADD CONSTRAINT "RenderedScene_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageSegment" ADD CONSTRAINT "ImageSegment_renderedSceneId_fkey" FOREIGN KEY ("renderedSceneId") REFERENCES "RenderedScene"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
