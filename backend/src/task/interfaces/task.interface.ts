export interface Task {
   readonly id: number;
   
   readonly title: string;

   readonly desc: string;

   readonly deadline: Date;

   readonly finishDate: Date;

   readonly createdAt: Date;

   readonly workerId: Array<number>;

   readonly createdById: number;

   readonly warning: boolean;

   readonly linked: Array<string>

   readonly discussionId: number;
   
   readonly extraDesc: string;
}