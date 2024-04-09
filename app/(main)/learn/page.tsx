import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
} from "@/db/queries";
import { redirect } from "next/navigation";
import { Unit } from "./unit";
import { lessons, units as unitsSchema } from "@/db/schema";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPecentageData = getLessonPercentage();
  const unitsData = getUnits();

  const [userProgress, units, courseProgress, lessonPecentage] =
    await Promise.all([
      userProgressData,
      unitsData,
      courseProgressData,
      lessonPecentageData,
    ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses")
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
                unit: typeof unitsSchema.$inferSelect
              } | undefined}
              activeLessonPercentage={lessonPecentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
