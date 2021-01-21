https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0&tabs=visual-studio

/home/$USER/.nuget/packages/microsoft.visualstudio.web.codegenerators.mvc/5.0.0/Templates


cd TodoApi
mkdir Template
cp -r ~/.nuget/packages/microsoft.visualstudio.web.codegenerators.mvc/5.0.1/Templates/ControllerGenerator ./Templates/
cp -r ~/.nuget/packages/microsoft.visualstudio.web.codegenerators.mvc/5.0.1/Templates/ViewGenerator ./Templates/

export PATH=/root/.dotnet/tools:$PATH

dotnet watch run


## To Add Swagger

services.AddSwaggerGen();

app.UseSwagger();  
app.UseSwaggerUI(c =>  
{  
c.SwaggerEndpoint("/swagger/v1/swagger.json", "My Test1 Api v1");  
});

Some packages are probably also needed