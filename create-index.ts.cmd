@ECHO OFF

FOR /F "tokens=*" %%k IN ('DIR src /b /s /ad') DO (
	IF EXIST %%k\index.ts (
		DEL %%k\index.ts
		ECHO Recreating index.ts for %%k
	)
	FOR /F "tokens=*" %%j IN ('DIR %%k\*.ts /b /a /on') DO (
      ECHO export * from './%%~nj';>> %%k\index.ts
	)
)
