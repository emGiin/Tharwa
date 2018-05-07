<?php

namespace Tests\Unit;

use App\Http\Controllers\VirmentController;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ConversionTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testToDZD()
    {
        $controller = new VirmentController();
        $controller->toDZD(1000,0.5,'cour_epar');



        $this->assertTrue(true);
    }
}
