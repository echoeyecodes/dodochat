import { AppError } from "@/features/common/errors/app-error";

export const MediaResourceErrorNames = {
    MEDIA_RESOURCE_NOT_FOUND: "MEDIA_RESOURCE_NOT_FOUND",
};

export const MediaResourceErrorMessages = {
    [MediaResourceErrorNames.MEDIA_RESOURCE_NOT_FOUND]:
        "No media resource found for the given query",
};

export const mediaResourceNotFound = () =>
    new AppError(
        MediaResourceErrorNames.MEDIA_RESOURCE_NOT_FOUND,
        MediaResourceErrorMessages[MediaResourceErrorNames.MEDIA_RESOURCE_NOT_FOUND]!,
    );
