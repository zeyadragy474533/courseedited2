import { notFound } from "next/navigation";
import { allCourses } from "@/lib/course-data";
import { CourseDetailClient } from "./course-detail-client";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = allCourses.find((c) => c.id === id);

  if (!course) {
    notFound();
  }

  const relatedCourses = allCourses.filter((c) => c.id !== course.id).slice(0, 2);

  return <CourseDetailClient course={course} relatedCourses={relatedCourses} />;
}
