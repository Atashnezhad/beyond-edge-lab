@echo off
REM Find the PID of the process running on port 4200
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :4200 ^| findstr LISTENING') do set PID=%%a

REM Kill the process using the PID
if defined PID (
    taskkill /PID %PID% /F
    echo Application killed successfully!
) else (
    echo No application running on port 4200.
)
pause
