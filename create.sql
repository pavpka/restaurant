CREATE TABLE cook (
	id SERIAL PRIMARY KEY,
	surname VARCHAR(20) NOT NULL,
	name VARCHAR(15) NOT NULL,
	patronymic VARCHAR(25) NOT NULL DEFAULT '-',
	work_shift INTEGER NOT NULL CONSTRAINT SHIFT_ERR CHECK(work_shift=1 OR work_shift=2),
	schedule INTEGER NOT NULL CONSTRAINT SCH_ERR CHECK(schedule=1 OR schedule=2),
	russian_cuisine INTEGER NOT NULL CONSTRAINT RUS_ERR CHECK(russian_cuisine=0 OR russian_cuisine=1),
	italian_cuisine INTEGER NOT NULL CONSTRAINT IT_ERR CHECK(italian_cuisine=0 OR italian_cuisine=1),
	japanese_cuisine INTEGER NOT NULL CONSTRAINT JAP_ERR CHECK(japanese_cuisine=0 OR japanese_cuisine=1),
	hours INTEGER NOT NULL CONSTRAINT HOURS_ERR CHECK (hours>=4 AND hours<=10)
)